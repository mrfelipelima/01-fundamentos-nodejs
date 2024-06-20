/**
 * Readable stream: Quando o node recebe alguma coisa para ser processada;
 * Writable stream: Quando enviamos alguma coisa para o frontend como resposta;
 * 
 * No node, toda porta de entrada ou saída, é automaticamente uma stream.
 * 
 * O processo (process) do node pode ser uma porta. No terminal temos o standard input (stdin)
 * e o standard output (stdout).
 */

/**
 * Nessa linha, tudo o que for inserido no terminal será retornado novamente
 * pelo terminal:
 * process.stdin.pipe(process.stdout)
 */

import { Readable, Transform, Writable } from 'node:stream'

class OneToOneHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 10) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToOneHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())