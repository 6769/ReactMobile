fname='./build/index.html'
with open(fname) as f:
    dat=f.read()
dat2=dat.replace('/static','static')
with open(fname,'w') as f:
    f.write(dat2)

