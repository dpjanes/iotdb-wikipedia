/*
 *  boxes.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-26
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

const assert = require("assert")

/**
 *  Requires: self.document
 *  Produces: self.boxes
 */
const boxes = _.promise.make((self, done) => {
    const method = "boxes"

    assert.ok(_.is.String(self.document), `${method}: expected self.document to be String`)

})

/**
 *  API
 */
exports.boxes = boxes;

const self = {
    document: `
djdjdl
{{Subspeciesbox
| image = Fenders blue butterfly Oregon.jpg
| status = LE
| status_system = ESA
| genus = Aricia
| species = icarioides
| subspecies = fenderi
| authority = (Macy, 1931)
| synonyms = ''Icaricia icarioides blackmorei''
}}

djkdkd
`
}

const rex = new RegExp("^{{([^\n]+)\n([^]*)^}}", "mg")

while (true) {
    const match = rex.exec(self.document);
    if (!match) {
        break
    }

    const name = match[1]
    const data = match[2]

    console.log(data)
}
