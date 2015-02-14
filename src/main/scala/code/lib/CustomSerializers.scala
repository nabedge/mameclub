package code.lib

import net.liftweb.json.JsonAST.{JDouble, JInt}
import net.liftweb.json._

/**
 * Created by andreas on 9/13/14.
 */
/**
 * A helper that will JSON serialize BigDecimal
 */
object CustomSerializers {

  object BigDecimalSerializer extends Serializer[BigDecimal] {
    private val Class = classOf[BigDecimal]

    def deserialize(implicit format: Formats): PartialFunction[(TypeInfo, JValue), BigDecimal] = {
      case (TypeInfo(Class, _), json) => json match {
        case JInt(iv) => BigDecimal(iv)
        case JDouble(dv) => BigDecimal(dv)
        case JString(sv) if (try {BigDecimal(sv);true}catch{case _ => false}) => BigDecimal(sv)
        case value => throw new MappingException("Can't convert " + value + " to " + Class)
      }
    }

    def serialize(implicit format: Formats): PartialFunction[Any, JValue] = {
      case d: BigDecimal => JDouble(d.doubleValue)
    }
  }

}
