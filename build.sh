docker build . -t registry.cn-shanghai.aliyuncs.com/pardjs/form-service:$1
echo prepared to push registry.cn-shanghai.aliyuncs.com/pardjs/form-service:$1
docker push registry.cn-shanghai.aliyuncs.com/pardjs/form-service:$1
echo registry.cn-shanghai.aliyuncs.com/pardjs/form-service:$1 pushed
