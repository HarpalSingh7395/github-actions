const core = require('@actions/core')

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function checkHealth(apiUrl, attempt, maxRetries) {
    const url = `${apiUrl}/health`
    core.info(`Attempt ${attempt}/${maxRetries}: Checking ${url}`)

    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }

    const data = await res.json()
    if (data.status !== 'ok') {
        throw new Error(`Unexpected status: ${data.status}`)
    }

    return data
}

async function run() {
    try {
        const apiUrl = core.getInput('api-url', { required: true }).replace(/\/$/, '')
        const maxRetries = parseInt(core.getInput('retries') || '3', 10)

        let lastError
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const data = await checkHealth(apiUrl, attempt, maxRetries)
                core.info(`✅ Health check passed! API is up. timestamp: ${data.timestamp}`)
                core.setOutput('status', 'ok')
                return
            } catch (err) {
                lastError = err
                core.warning(`Attempt ${attempt} failed: ${err.message}`)
                if (attempt < maxRetries) {
                    core.info(`Waiting 5s before retry...`)
                    await sleep(5000)
                }
            }
        }

        core.setOutput('status', 'failed')
        core.setFailed(`Health check failed after ${maxRetries} attempts: ${lastError.message}`)
    } catch (err) {
        core.setOutput('status', 'failed')
        core.setFailed(err.message)
    }
}

run()
