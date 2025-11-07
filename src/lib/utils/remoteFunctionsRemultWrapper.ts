import { getRequestEvent } from "$app/server";
import { api } from "$server/api";
import { repo, type ClassType, type Repository } from "remult";

// This function wrapper gets rid of boilerplate
export async function withRemultApi<T, R>(
  entity: ClassType<T>,
  repoCallback: (repository: Repository<T>) => Promise<R>
): Promise<R> {
  return await api.withRemult(getRequestEvent(), async () => {
    const repository = repo(entity);
    const result = await repoCallback(repository);
    
    // Only apply toJson for entity/entities results
    if (Array.isArray(result) && result.length > 0 && result[0] instanceof entity) {
      return repository.toJson(result) as R;
    }
    if (result instanceof entity) {
      return repository.toJson(result) as R;
    }
    
    // For primitives (count, aggregate, etc.) return as-is
    return result;
  });
}