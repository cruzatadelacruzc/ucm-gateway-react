package sld.ucm.gateway.service.error;

public class StorageFileNotFoundException extends RuntimeException {

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
