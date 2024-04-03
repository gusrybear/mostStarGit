const readline = require("node:readline")

const rl = readline.createInterface({
  input: process.stdin,

  output: process.stdout,
})

const baseUrl = `https://api.github.com/search/repositories`

const getStrDate = (text) => {
  return text.split("-").join("")
}

const isLessThanOrEqual = (value1, value2) => {
  return parseInt(value1) <= parseInt(value2)
}

rl.question(`What is Start Date(YYYY-MM-DD)?`, (startDate) => {
  rl.question(`What is End Date(YYYY-MM-DD)?`, (endDate) => {
    if (isLessThanOrEqual(getStrDate(startDate), getStrDate(endDate))) {
      const query = `?q=created:${startDate}..${endDate}&sort=stars&order=desc`
      const url = baseUrl + query
      const headers = {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }

      fetch(url, { method: "GET", headers: headers })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Network response not ok.`)
          }

          return res.json()
        })

        .then((data) => {
          for (const repo of data.items) {
            console.log(
              `(${repo.stargazers_count}) ${repo.name} => ${repo.description}`
            )
          }
        })

        .catch((error) => {
          console.log(`Error:`, error)
        })
    } else {
      console.log(`Error start date is chosen after end date`)
    }

    rl.close()
  })
})
