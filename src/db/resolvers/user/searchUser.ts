import { Arg, ClassType, Int, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/db/models';

// types
import { SearchUserResponse } from '~/db/types/responses/user';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const searchUser = (Base: ClassType) => {
  @Resolver()
  class SearchUser extends Base {
    @Query((_returns) => SearchUserResponse)
    @UseMiddleware(verifyAuth)
    searchUser(
      @Arg('query') query: string,
      @Arg('limit', (_type) => Int) limit: number,
    ): Promise<SearchUserResponse> {
      try {
        return respond(async () => {
          const users = await User.find({
            $or: [{ username: { $regex: query } }, { email: { $regex: query } }],
          })
            .limit(limit)
            .populate(['followers', 'following'])
            .lean();

          return {
            code: 200,
            success: true,
            users,
          };
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  return SearchUser;
};

export default searchUser;
