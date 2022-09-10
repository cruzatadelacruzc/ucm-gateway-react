package sld.ucm.gateway.service;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sld.ucm.gateway.service.error.StorageFileNotFoundException;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
public class FileService {

    private final MinioClient minioClient;
    @Value("${minio.bucket.name}")
    private String bucketName;

    public FileService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    /**
     * Load the stored filename
     *
     * @param filename Resource name
     * @return Resource The stored resource
     */
    public byte[] loadAsResource(String filename) {
        try (InputStream stream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(filename)
                        .build())) {
            byte[] content = stream.readAllBytes();
            stream.close();
            return content;
        } catch (InvalidKeyException
                | ErrorResponseException
                | InvalidResponseException
                | ServerException
                | InsufficientDataException
                | XmlParserException
                | InternalException
                | IOException
                | NoSuchAlgorithmException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }
}
