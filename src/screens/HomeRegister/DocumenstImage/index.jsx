import React from "react";
import { View } from "react-native";
import DocumentFront from './DocumentFront';
import DocumentReverse from './DocumentReverse';
import DocumentCertificate from './DocumentCertificate';
import DocumentSelfie from "./DocumentSelfie.jsx";

export default function DocumentImage({route}) {
    const { mode } = route.params;
    switch (mode) {
        case 1:
            return <DocumentSelfie mode={mode} />
        case 2:
            return <DocumentFront mode={mode} /> 
        case 3:
            return <DocumentReverse mode={mode} />
        case 4:
            return <DocumentCertificate mode={mode} />
        default:
            return <View></View>
    }
}