import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      // baseURL:"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      baseURL:"http://ticketing-app-prod.store",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseUrl: "/",
    });
  }
};


