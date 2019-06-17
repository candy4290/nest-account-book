###
内置token认证怎么做？

### (已解决)
中间件中设置header头会报错，Cannot set headers after they are sent to the client
解决方案，中间件直接抛出错误，errorfilter中去设置报错的header头等等。