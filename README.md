# Simple Node.js Scaling Example

Simple example of scaling an Express.js application.

## Description

The web app asks the user to make either a blocking or non-blocking API request:
`http://localhost:8080/api/blocking`
`http://localhost:8080/api/non-blocking`

The aim is to demonstrate a number of things:

* An example of a CPU intensive blocking operation in node.js and its consequences for the event loop;
* A solution to the above via a seperation of server/worker processes and using Kue as a priority queue;
* A scalable deployment method using Docker Compose in order to instantiate:
  * Multiple instances of the `node_server/app.js` Express.js application;
  * Redis;
  * A background worker process, `non-blocking-worker.js`;
  * An Nginx reverse-proxy acting as a load-balancer for the `node_server` instances;
* Express.js application project structure for `node_server` application.

## Getting Started

To deploy, simply run:
```
docker-compose up --scale node-server-instance-1=N
```
where `N` is the number of `node_server` instances to deploy.

Navigate to `http://localhost:8080/` and select which API call to make.

### N = 1

When `N = 1`, there is only a single server instance, so a call to `http://localhost:8080/api/blocking`
will block the server event loop and prevent further navigations to `http://localhost:8080/` and other API requests.

### N > 1

When `N > 1`, there are multiple server instances, and API requests are amongst them via
the Nginx load-blanacer. Calls to `http://localhost:8080/api/blocking` will block the server
event loop for a particular server instance, meaning further navigations to `http://localhost:8080/` and other
API requests may be handled depending on their routing by the load-balancer.

Each server instance will log that it has been hit with an API request, and this is visible in the log outputs
for each instance, demonstrating the load-balancer in effect.
