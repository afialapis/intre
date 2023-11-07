before(async function(){
  const intre = await import( "../src/index.mjs")
  const fetch = await import('node-fetch')
      
  global.intre = intre  
  global.fetch = fetch.default
})

