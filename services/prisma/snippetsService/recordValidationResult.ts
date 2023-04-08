import prisma from '../prisma';
import { validationResult } from '@/services/openai/openAIValidateSnippet';

export default async function recordValidationResult(result: validationResult) {
  if (result.reported === null) {
    await prisma.snippetsValidationResults.create({
      data: {
        snippetId: result.snippetId,
        reason: result.reason,
        checked: false
      }
    });

    return true;
  }

  await prisma.snippetsValidationResults.create({
    data: {
      snippetId: result.snippetId,
      reported: result.reported,
      reason: result.reason
    }
  });

  return true;
}
