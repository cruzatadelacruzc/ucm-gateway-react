package sld.ucm.gateway.web.rest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import sld.ucm.gateway.service.FileService;
import sld.ucm.gateway.web.rest.util.ResponseUtil;

@RestController
@RequestMapping("api/files")
public class FileResource {

    private final FileService service;

    public FileResource(FileService service) {
        this.service = service;
    }

    /**
     * {@code GET /files/:avatar} : get the "avatar" file.
     *
     * @param avatar the name file to retrieve
     * @return the {@link ResponseEntity} with status {@code 200 OK} and with body the avatar,
     * or with status {@code 404 (Not Found)}
     */
    @GetMapping(value = "/{avatar:.+}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Mono<ResponseEntity<byte[]>> getAvatar(@PathVariable String avatar) {
        byte[] fetchedAvatar = service.loadAsResource(avatar);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE));
        return ResponseUtil.foundOrNot(Mono.just(fetchedAvatar), headers);
    }
}
