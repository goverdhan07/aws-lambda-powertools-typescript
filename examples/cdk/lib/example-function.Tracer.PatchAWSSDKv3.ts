import { Context } from 'aws-lambda';
import { Events } from '@aws-lambda-powertools/commons';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';

// process.env.POWERTOOLS_SERVICE_NAME = 'tracerManualFn'; // Alternative to setting the service name in the constructor
const tracer = new Tracer({ serviceName: 'tracerManualFn' });
// To patch a specific AWS SDK v3 Client, we need to pass it to the Tracer that will return an instrumented version of it
const sts = tracer.captureAWSv3Client(new STSClient({}));

export const handler = async (_event: typeof Events.Custom.CustomEvent, _context: Context): Promise<unknown> => {
  const segment = tracer.getSegment(); // This is the facade segment (the one that is created by AWS Lambda)
  // Create subsegment for the function & set it as active
  const subsegment = segment.addNewSubsegment(`## ${process.env._HANDLER}`);
  tracer.setSegment(subsegment);
  
  let res;
  try {
    // Tracer will create a subsegment for the AWS SDK call and capture relevant annotations and metadata
    res = await sts.send(new GetCallerIdentityCommand({}));
    // Add custom metadata with the response object
    tracer.putMetadata('awsResponse', res);
  } catch (err) {
    throw err;
  }

  // Close subsegment (the AWS Lambda one is closed automatically)
  subsegment.close();
  // Set the facade segment as active again
  tracer.setSegment(segment);

  return res;
};