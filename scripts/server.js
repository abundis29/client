var spawnSync = require('child_process').spawnSync
// const { username } = require('os').userInfo()

const result = spawnSync('cd server && npm run dev:ts', { stdio: 'inherit', shell: true })
if (result.status !== 0) {
  process.exit(result.status)
}
