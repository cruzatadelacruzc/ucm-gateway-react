package sld.ucm.gateway.web.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import sld.ucm.gateway.security.AuthoritiesConstants;

import java.util.ArrayList;
import java.util.List;

/**
 * REST controller for managing Gateway configuration.
 */
@RestController
@RequestMapping("/api/gateway")
public class GatewayResource {

    private final RouteLocator routeLocator;

    private final DiscoveryClient discoveryClient;

    @Value("${spring.application.name}")
    private String appName;

    public GatewayResource(RouteLocator routeLocator, DiscoveryClient discoveryClient) {
        this.routeLocator = routeLocator;
        this.discoveryClient = discoveryClient;
    }

    /**
     * {@code GET  /routes} : get the active routes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the list of routes.
     */
    @GetMapping("/routes")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<RouteVM>> activeRoutes() {
        Flux<Route> routes = routeLocator.getRoutes();
        List<RouteVM> routeVMs = new ArrayList<>();
        routes.subscribe(
                route -> {
                    RouteVM routeVM = new RouteVM();
                    String predicate = route.getPredicate().toString();
                    String path = predicate.substring(predicate.indexOf("[") + 1, predicate.indexOf("]"));
                    routeVM.setPath(path);
                    String serviceId = route.getId().substring(route.getId().indexOf("_") + 1).toLowerCase();
                    routeVM.setServiceId(serviceId);
                    // Exclude gateway app from routes
                    if (!serviceId.equalsIgnoreCase(appName)) {
                        routeVM.setServiceInstances(discoveryClient.getInstances(serviceId));
                        routeVMs.add(routeVM);
                    }
                }
        );
        return ResponseEntity.ok(routeVMs);
    }

    /**
     * View Model that stores a route managed by the Gateway.
     */
    public static class RouteVM {

        private String path;

        private String serviceId;

        private List<ServiceInstance> serviceInstances;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getServiceId() {
            return serviceId;
        }

        public void setServiceId(String serviceId) {
            this.serviceId = serviceId;
        }

        public List<ServiceInstance> getServiceInstances() {
            return serviceInstances;
        }

        public void setServiceInstances(List<ServiceInstance> serviceInstances) {
            this.serviceInstances = serviceInstances;
        }
    }
}
