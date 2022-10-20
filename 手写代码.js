Promise(function(resolve,reject){})

function myPromise(func) {
    let resolve=func.agruments[0]
    let reject
    reject=func.agruments && func.agruments[1]
    func()
    
    
    const prom={}
    return prom
}