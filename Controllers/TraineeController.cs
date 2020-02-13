
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using traineeApp.Model;

namespace traineeApp.Controllers
{
    [Route("api/[controller]")]
    public class TraineeController: Controller {
        private readonly TraineeAppContext context;
        
        public TraineeController(TraineeAppContext context) {
            this.context = context;
        }

        [HttpGet]
        [Route("getAllTrainee")]
        public IEnumerable<Trainee> GetAllTrainee() {
            return context.Trainee.ToList();
        }

        [HttpGet("{id}")]
        [Route("getTrainee")]
        public IActionResult GetById(long id) {
            var item = context.Trainee.FirstOrDefault(t => t.id == id);
            if (item == null)
                return NotFound();
            return new ObjectResult(item);
        }

        [HttpPost]
        [Route("addTrainee")]
        public IActionResult Create([FromBody] Trainee item) {
            if (item == null)
                return BadRequest();

            context.Trainee.Add(new Trainee {
                name = item.name,
                email = item.email,
                gender = item.gender,
                birth = item.birth,
                experiencedTechno = item.experiencedTechno,
                message = item.message
            });
            context.SaveChanges();

            return Ok(new {
                message = "Trainee added successfully."
            });
        }

        [HttpPut("{id}")]
        [Route("updateTrainee")]
        public IActionResult Update(long id, [FromBody] Trainee item) {
            if (item == null)
                return BadRequest();

            var trainee = context.Trainee.FirstOrDefault(t => t.id == id);
            if (trainee == null)
                return NotFound();

            trainee.name = item.name;
            trainee.email = item.email;
            trainee.gender = item.gender;
            trainee.birth = item.birth;
            trainee.experiencedTechno = item.experiencedTechno;
            trainee.message = item.message;
            context.Trainee.Update(trainee);
            context.SaveChanges();

            return Ok(new {
                message = "Trainee details updated successfully."
            });
        }

        [HttpDelete("{id}")]
        [Route("deleteTrainee")]
        public IActionResult Delete(long id) {
            var trainee = context.Trainee.FirstOrDefault(t => t.id == id);
            if (trainee == null)
                return NotFound();

            context.Trainee.Remove(trainee);
            context.SaveChanges();

            return Ok(new {
                message = "Trainee is deleted successfully."
            });
        }
    }
}