import { Module } from '@nestjs/common';
import { HashHelper } from './helpers/hash.helper';
import { Sha256Helper } from './helpers/sha256.helper';
import { HttpHelper } from './helpers/http.helper';
import { NumberHelper } from './helpers/number.helper';
import { ErrorHelper } from './helpers/error.helper';
import { Base64Helper } from './helpers/base64.helper';
import { DateHelper } from './helpers/date.helper';
import { UUIDHelper } from './helpers/uuid.helper';
import { JsonHelper } from './helpers/json.helper';

@Module({
  providers: [
    NumberHelper,
    HashHelper,
    ErrorHelper,
    Base64Helper,
    DateHelper,
    UUIDHelper,
    JsonHelper,
    Sha256Helper,
    HttpHelper,
  ],
  exports: [
    NumberHelper,
    HashHelper,
    ErrorHelper,
    Base64Helper,
    DateHelper,
    UUIDHelper,
    JsonHelper,
    Sha256Helper,
    HttpHelper,
  ],
})
export class CommonModule {}
