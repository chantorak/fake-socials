using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// This class was created so not to repeat these decorations
[ApiController]
[Route("api/[controller]")] // [controller] means take the path from the class ActivitiesController -> activities
public class BaseApiController : ControllerBase
{
}