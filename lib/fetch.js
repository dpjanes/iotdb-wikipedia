/*
 *  fetch.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-25
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers")
const fetch = require("iotdb-fetch")

const assert = require("assert")
const path = require("path")
const URL = require("url").URL

/**
 *  Requires: self.url
 *  Produces: self.document
 */
const fetch_ = _.promise((self, done) => {
    _.promise.validate(self, fetch_)

    let title = null
    let site = "en.wikipedia.org"

    if (self.url.indexOf("/") === -1) {
        title = self.url
    } else {
        const url = new URL(self.url)
        if (url.searchParams.get("title")) {
            title = url.searchParams.get("title")
        } else {
            title = path.basename(url.pathname)
        }
    }

    assert.ok(_.is.String(title), `${fetch_.method}: could not extract a title from "${self.url}"`)

    _.promise(self)
        .then(fetch.document.get(`https://${site}/w/index.php?title=${title}&action=raw`))
        .end(done, self, "document")
})

fetch_.method = "fetch"
fetch_.requires = {
    url: _.is.String,
}
fetch_.accepts = {
}
fetch_.produces = {
}

/**
 *  API
 */
exports.fetch = fetch_;


_.promise({
    urls: [
        // "https://en.wikipedia.org/wiki/Pseudoniphargus_grandimanus",
        // "https://en.wikipedia.org/w/index.php?title=Blue-fronted_lorikeet&action=raw",
        // "Gold",
        "https://en.wikipedia.org/wiki/Diamond_simulant",
    ]
})
    .each({
        method: fetch_,
        inputs: "urls:url",
        outputs: "documents",
        output_selector: sd => sd.document,
    })
    .make(sd => {
        console.log(sd.documents)
    })
    .catch(error => {
        console.log("#", _.error.message(error))
    })
