export function getEnvironmentVariable(environmentVariable: string): string {
    const validatedEnvironmentVariable = process.env[environmentVariable]
    if (!validatedEnvironmentVariable) {
        throw new Error(`Could not find environment variable: ${environmentVariable}`)
    } else {
        return validatedEnvironmentVariable
    }
}

const env = {

}

export default env