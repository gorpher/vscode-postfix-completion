export function delay(timeout: number) {
    return new Promise<void>((resolve) => {
        resolve()
        // setTimeout(resolve, timeout)
    })
}
const delaySteps: Array<number> = [2000, 1200, 700, 400, 300, 250]

export const getCurrentDelay = () :number =>{
    return  delaySteps[delaySteps.length-1]
}
