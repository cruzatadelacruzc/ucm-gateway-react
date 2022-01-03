import React from 'react';
import {cropDialogStyles} from "./style";
import {useTranslation} from "react-i18next";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import toast from '../notification-snackbar.util';
import {Close as CloseIcon} from '@material-ui/icons';
import ReactCrop, {Crop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface ICropImageDialog {
    onSave: (image: File) => void,
    openCrop: boolean,
    selectedImage:File,
    onClose:  React.Dispatch<React.SetStateAction<boolean>>,
    imgHeight?: number,
    imgWidth?: number
}
export default function CropImageDialog(props: ICropImageDialog) {
    const classes = cropDialogStyles();
    const {t} = useTranslation(['error']);
    const [src, setSrc] = React.useState('');
    const [croppedFile, setCroppedFile] = React.useState<File>();
    const [completedCrop, setCompletedCrop] = React.useState<Crop>()
    const imgRef = React.useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = React.useState<Crop>({
        unit: "px",
        width: 200,
        height: 200,
        x: 25,
        y: 25
    })
    React.useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSrc(reader.result as string)
        }
        reader.onerror = function () {
            toast.error(t('upload'))
        };
        reader.readAsDataURL(props.selectedImage);
    }, [props.selectedImage]) // eslint-disable-line react-hooks/exhaustive-deps

    const onLoad = React.useCallback((img) => {
        imgRef.current = img;
    }, []);

    React.useEffect(() => {
        const crop = completedCrop;
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;

        if (!crop || !canvas || !image) {
            return;
        }
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        if (!ctx) {
            return;
        }

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        // ctx.imageSmoothingEnabled = false; only to crop image/jpeg
        ctx.imageSmoothingQuality = "high"

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        canvas.toBlob((blob) => {
            if (!blob || !image) {
                return;
            }
            const newFile = new File(
                [blob],
                "avatar.png",
                {type: "image/png", lastModified: Date.now()}
                );
            setCroppedFile(newFile);
        });
    }, [completedCrop])

       return(
           <>
               <Dialog
                   maxWidth="sm"
                   classes={{paper: classes.paper}}
                   open={props.openCrop}
                   onClose={() => props.onClose(false)}
                   aria-labelledby="image-crop-dialog"
                   aria-describedby="image-crop-description"
               >
                   <DialogTitle id="image-crop-dialog">{t("common:photo_crop")}</DialogTitle>
                   <IconButton aria-label="close" className={classes.closeButton}
                               onClick={() => props.onClose(false)}
                   >
                       <CloseIcon/>
                   </IconButton>
                   <DialogContent>
                       <ReactCrop
                           src={src}
                           crop={crop}
                           keepSelection
                           onImageLoaded={onLoad}
                           maxWidth={props.imgWidth ? props.imgWidth : 200}
                           maxHeight={props.imgHeight ? props.imgHeight : 200}
                           onComplete={(crop) => setCompletedCrop(crop)}
                           onChange={(crop, percentCrop) => setCrop(percentCrop)}
                       />
                   </DialogContent>
                   <DialogActions>
                       <Button
                           variant="outlined"
                           onClick={() => {
                           if (croppedFile) {
                               props.onSave(croppedFile)
                               props.onClose(false);
                           }
                       }} color="primary">
                           {t('common:finish')}
                       </Button>
                   </DialogActions>
               </Dialog>
               <canvas ref={previewCanvasRef} style={{ width: 0, height: 0 }} />
        </>
    )
};

