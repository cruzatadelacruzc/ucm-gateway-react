package sld.ucm.gateway.web.rest.error;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

import java.net.URI;

public class DisableAccountException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public DisableAccountException() {
        super(URI.create("about:blank"), "Disable account", Status.FORBIDDEN, "Account is not activated");
    }
}
