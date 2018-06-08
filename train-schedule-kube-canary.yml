kind: Service
apiVersion: v1
metadata:
  name: train-schedule-service-canary
spec:
  type: NodePort
  selector:
    app: train-schedule
    track: canary
  ports:
  - protocol: TCP
    port: 8080
    nodePort: 8081

---

apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: train-schedule-deployment-canary
  labels:
    app: train-schedule
spec:
  replicas: $CANARY_REPLICAS
  selector:
    matchLabels:
      app: train-schedule
      track: canary
  template:
    metadata:
      labels:
        app: train-schedule
        track: canary
    spec:
      containers:
      - name: train-schedule
        image: $DOCKER_IMAGE_NAME:$BUILD_NUMBER
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 15
          timeoutSeconds: 1
          periodSeconds: 10
        resources:
          requests:
            cpu: 200m
