
import { templateTypes } from '../enums';
import { IArgs } from '../parse-args';

export function gulpDest(args: IArgs): string {
  switch ( args.template ) {

    // ui platform
    case templateTypes.MATERIAL:
      return 'src/lib';

    // ui platform
    case templateTypes.CDK:
      return 'src/cdk';

    // ui platform
    case templateTypes.COMPONENT:
      return 'src/app';

    // ui platform
    case templateTypes.SERVICE:
      return 'src/service';

    default:
      return '';
  }
}
