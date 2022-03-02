class Util {
    /**
     * Returns time converted to readable string
     * @param { number } seconds - Time in seconds
     * @returns { string } Formatted time
     */
    static convertTime = (seconds: number) => {
        let convert = (x: any) => {
            return x < 10 ? '0' + x : x;
        };

        return (
            convert(Math.floor(Number(seconds) / (60 * 60))) +
            'h ' +
            convert(Math.floor(Number(seconds) / 60) % 60) +
            'm ' +
            convert(Math.floor(Number(seconds) % 60)) +
            's'
        );
    };

    static memory = (bytes = 0, r = true) => {
        const gigaBytes = bytes / 1024 ** 3;

        if (gigaBytes > 1) {
            return `${gigaBytes.toFixed(1)} ${r ? 'GB' : ''}`;
        }

        const megaBytes = bytes / 1024 ** 2;
        if (megaBytes > 1) {
            return `${megaBytes.toFixed(2)} ${r ? 'MB' : ''}`;
        }

        const kiloBytes = bytes / 1024;
        if (kiloBytes > 1) {
            return `${kiloBytes.toFixed(2)} ${r ? 'KB' : ''}`;
        }

        return `${bytes.toFixed(2)} ${r ? 'B' : ''}`;
    };
}

export default Util;
