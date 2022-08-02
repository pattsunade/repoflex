import * as ImageManipulator from 'expo-image-manipulator';

export const compressImageByUri = async (image) => { 
    console.log(image)
    const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { [image.width > image.height? 'width': 'height']: 1000 } }],
        { 
            compress: 0.5,
            base64: true, 
            format: ImageManipulator.SaveFormat.JPEG 
        }
    );
    console.log(manipResult.width, manipResult.height )
    return manipResult
}