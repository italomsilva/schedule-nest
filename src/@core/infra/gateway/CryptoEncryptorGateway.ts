import * as bcrypt from 'bcrypt';
import { EncryptorGateway } from '../../domain/gateway/EncryptorGateway';

export class CryptoEncryptorGateway implements EncryptorGateway {

    async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async compare(clean: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(hash, clean ); 
        return isMatch;
    }
}
