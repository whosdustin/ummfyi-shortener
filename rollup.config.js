import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import * as fs from 'fs';
import fetch from 'node-fetch'

const production = !process.env.ROLLUP_WATCH;
const buildDest = 'public'

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		buildRoutes(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}

async function buildRoutes() {
	try {
		console.log('=== Bleep bloop, I\'m building Routes ===')

		const url = `https://api.netlify.com/api/v1/forms/${process.env.ROUTES_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`

		const response = await fetch(url)
		const body = await response.json()

		let routes = []

		for (const route in body) {
			let destination = body[route].data.destination
			const code = body[route].data.code

			if (destination.indexOf('://') == -1) {
				destination = `http://${destination}`
			}

			routes = [...routes, `/${code} ${destination} 302`]
		}

		fs.writeFile(`${buildDest}/_redirects`, routes.join('\n'), (error) => {
			if (error) {
				return console.log(error)
			} else {
				return console.log('Routes data save.')
			}
		})
	} catch (error) {
		console.log(`Something went wrong: ${error}`)
	}
}
