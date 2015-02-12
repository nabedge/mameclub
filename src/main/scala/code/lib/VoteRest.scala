package code.lib

import code.comet.NomineeComet
import net.liftweb.http.JsonResponse
import net.liftweb.http.rest.RestHelper
import net.liftweb.json.JsonAST.JNull
import net.liftweb.json.{JValue, DefaultFormats}
import net.liftweb.json.Extraction._


/**
 * Created by andreas on 2/11/15.
 */
object VoteRest extends RestHelper {
  override implicit val formats = DefaultFormats.lossless

  serve {
    case "mameclub" :: "vote" :: Nil JsonGet _ =>
      JsonResponse(getVotes)

    case "mameclub" :: "vote" :: Nil JsonPost cijson -> _ =>
      postVote(cijson)
      JsonResponse(cijson)
  }

  def getVotes = JNull //TODO

  def postVote(cijson: JValue) = {
    val ci = extract[Vote](cijson)
    State.addVote(ci)
  }

}



