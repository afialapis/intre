before(async function(){
  const intre= await import( "../src/index.mjs")

  global.intre = intre
})

