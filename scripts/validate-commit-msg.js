const fs = require('fs')

const commitMsgFilePath = process.argv[2]
const commitMsg = fs.readFileSync(commitMsgFilePath, 'utf8')

const issueKeyRegExp = /\(DEV-\d+\):/ // regex to match JIRA issue key, e.g. (DEV-23):

if (!issueKeyRegExp.test(commitMsg)) {
  console.error('ERROR: No JIRA Issue Key (DEV-{number}) found in commit message')
  process.exit(1) // exits with failure status
}
