package code.snippet

import bootstrap.liftweb.ParamInfo
import net.liftweb.http.S
import net.liftweb.util._
import Helpers._

/**
 * Created by andreas on 2/13/15.
 */
class Nominee(pi: ParamInfo) {

  def render = <lift:comet type="NomineeComet" name={pi.theParam}/>
}

case class ParamInfo(theParam: String)
