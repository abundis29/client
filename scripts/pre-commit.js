var spawnSync = require('child_process').spawnSync
const result = spawnSync('npm run validate --silent', { stdio: 'inherit', shell: true })
if (result.status !== 0) {
  process.exit(result.status)
}
console.log('ALL GOOD ✅')