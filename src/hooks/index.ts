import { useEffect, useRef } from 'react'


//深度监听的hooks
export const usePrevious = (obj: any): any => {
    const ref = useRef()

    useEffect(() => {
        ref.current = obj
    }, [obj])

    return ref.current
}