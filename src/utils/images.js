import * as ImageManipulator from 'expo-image-manipulator';

export const compressImageByUri = async ({uri}) => { 
    const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { 
            compress: 0.5,
            base64: true, 
            format: ImageManipulator.SaveFormat.JPEG 
        }
    );
    return manipResult
}