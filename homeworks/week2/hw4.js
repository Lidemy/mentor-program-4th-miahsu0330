function printFactor(n) {
  for(var i = 1; i <= n; i += 1) {
      if(n % i === 0) {
          console.log(i);
      }
  }
}

// printFactor(10);
// printFactor(13);