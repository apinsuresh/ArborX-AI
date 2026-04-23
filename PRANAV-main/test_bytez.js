import Bytez from "bytez.js"
const key = "73545f2d4aec98bfe7321e18daa36b72"
const sdk = new Bytez(key)
const model = sdk.model("meta-llama/Llama-3.1-8B-Instruct")
const res = await model.run([{"role": "user", "content": "Hello"}])
console.log(JSON.stringify(res.output, null, 2))
