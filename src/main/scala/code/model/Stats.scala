package code.model

import net.liftweb.mapper._

/**
 * Created by andreas on 2/14/15.
 */
object Stats extends Stats with KeyedMetaMapper[String, Stats]{

}

class Stats extends KeyedMapper[String, Stats]{
  def getSingleton = Stats
  override def primaryKeyField = nominee

  object nominee extends MappedStringIndex(this,128)
  object dispName extends MappedStringIndex(this,128)
  object maleBeans extends MappedInt(this)
  object maleKisses extends MappedInt(this)
  object femaleBeans extends MappedInt(this)
  object femaleKisses extends MappedInt(this)
}
