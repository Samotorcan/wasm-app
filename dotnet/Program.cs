using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using System.Text.Json;
using System.Text.Json.Serialization;

[assembly: SupportedOSPlatform("browser")]
namespace Wasm;

static partial class Program
{
  static void Main() { }



  [JSExport]
  static string RemoveComments(string json)
  {
    var jsonElement = JsonSerializer.Deserialize(json, RemoveCommentsJsonSerializerContext.Default.JsonElement)!;
    return JsonSerializer.Serialize(jsonElement, RemoveCommentsJsonSerializerContext.Default.JsonElement);
  }

  [JsonSourceGenerationOptions(
    ReadCommentHandling = JsonCommentHandling.Skip,
    WriteIndented = true
  )]
  [JsonSerializable(typeof(JsonElement))]
  partial class RemoveCommentsJsonSerializerContext : JsonSerializerContext {}


  [JSExport]
  static string ParsePerson(string json)
  {
    var jsonElement = JsonSerializer.Deserialize(json, ParsePersonCommentsJsonSerializerContext.Default.Person)!;
    return JsonSerializer.Serialize(jsonElement, ParsePersonCommentsJsonSerializerContext.Default.Person);
  }

  [JsonSourceGenerationOptions(
    ReadCommentHandling = JsonCommentHandling.Skip,
    WriteIndented = true,
    UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,
    AllowTrailingCommas = true
  )]
  [JsonSerializable(typeof(Person))]
  partial class ParsePersonCommentsJsonSerializerContext : JsonSerializerContext {}

  public class Person
  {
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required Company Company { get; init; }
  }
  public class Company
  {
    public required string CompanyName { get; init; }
  }


}
