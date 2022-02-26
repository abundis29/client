#!/usr/bin/env node

var spawnSync = require('child_process').spawnSync

var FAILURE = 'failure'
var SUCCESS = 'success'

// disable https://scarf.sh/
// which is used by some projects dependencies
process.env.SCARF_ANALYTICS = false

var styles = {
  // got these from playing around with what I found from:
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  // they're the best I could find that works well for light or dark terminals
  success: { open: '\u001b[32;1m', close: '\u001b[0m' },
  danger: { open: '\u001b[31;1m', close: '\u001b[0m' },
  info: { open: '\u001b[36;1m', close: '\u001b[0m' },
  subtitle: { open: '\u001b[2;1m', close: '\u001b[0m' },
}

function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close
}

function run(title, subtitle, command, options) {
  options = options || {}

  console.log(color('info', '    ▶️  Starting: ' + title))
  console.log(color('subtitle', '          ' + subtitle))
  console.log(color('subtitle', '          Running the following command: ' + command))

  var result = spawnSync(command, { stdio: 'inherit', shell: true })

  if (result.status !== 0 && !options.ignoreFailure) {
    console.error(
      color(
        'danger',
        '    🚨  Failure: ' +
        title +
        '. Please review the messages above for information on how to troubleshoot and resolve this issue.',
      ),
    )
    process.exit(result.status)
    return FAILURE
  }

  console.log(color('success', '    ✅  Success: ' + title + '\n\n'))
  return SUCCESS
}

function main() {
  var result
  result = run(
    'Clean ALL',
    'Installing third party code dependencies so the > works properly on this computer.',
    "find . -name 'node_modules' -type d -prune && find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +",
  )
  if (result === FAILURE) return

  result = run(
    'Root Dependency Installation',
    'Installing third party code dependencies so the > works properly on this computer.',
    'npm install && npm audit && npm fund',
  )
  if (result === FAILURE) return
  process.exit(SUCCESS)
}

main()