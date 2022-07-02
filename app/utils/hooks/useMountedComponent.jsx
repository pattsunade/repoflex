import React from 'react'

// este hooks ayuda a evitar memory leaks
function useMountedComponent() {
    const mounted = React.useRef(true);
    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false
        }
    }, [])

    return {
        mounted: mounted.current
    }
}

export default useMountedComponent