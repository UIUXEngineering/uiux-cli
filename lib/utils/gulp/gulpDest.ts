
import { templateTypes } from '../enums';
import { IArgs } from '../parse-args';

export function gulpDest(args: IArgs): string {
  switch ( args.template ) {

    // ui platform
    case templateTypes.MATERIAL:
      return 'src/ui-lib';

    // ui platform
    case templateTypes.CDK:
      return 'src/ui-cdk';

    // ui platform
    case templateTypes.COMPONENT:
      return 'src/ui-app';

    // ui platform
    case templateTypes.SERVICE:
      return 'src/ui-service';

    default:
      return '';
  }
}
