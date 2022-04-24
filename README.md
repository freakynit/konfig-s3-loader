# konfig-s3-loader
S3 loader plugin for [konfig](https://github.com/freakynit/konfig)

## Usage:
```typescript
// npm install --save konfig-s3-loader
import {konfig, contracts} from 'konfig';
import {S3Provider} from 'konfig-s3-loader';

const s3Provider = (): contracts.Loader => S3Provider({
  s3Config: {
    accessKeyId: '<AWS_S3_ACCESS_KEY>',
    secretAccessKey: '<AWS_S3_ACCESS_KEY_SECRET>',
    region: '<AWS_S3_REGION>'
  }
});
const config = await konfig('s3://<bucket>/<config-file-path>', {loader: s3Provider});
```

You can also supply existing s3 client if you have as follows:
```typescript
import {konfig, contracts} from 'konfig';
import {S3Provider} from 'konfig-s3-loader';

const s3Provider = (): contracts.Loader => S3Provider({
    s3: new AWS.S3({...})
});
```

Use directly without creating temporary variable:
```typescript
import {konfig, contracts} from 'konfig';
import {S3Provider} from 'konfig-s3-loader';

const config = await konfig('s3://<bucket>/<config-file-path>', {loader: S3Provider({
    s3: new AWS.S3({...})
})});
```
