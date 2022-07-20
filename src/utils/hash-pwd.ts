import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512', 'gfh7483oY^%&%$^$&(*OIlkjmkjnbBGcr"!$%&*()OI@:L~P{JUHYFYTFjIU&TGYHuhyur6543*&)(*_)(_(&YH');
    hmac.update(p);

    return hmac.digest('hex');
}